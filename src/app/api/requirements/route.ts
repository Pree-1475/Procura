import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendConfirmationEmail } from '@/lib/email';
import { randomBytes } from 'crypto';

function generateReferenceId() {
  const year = new Date().getFullYear();
  // Generate a random 5 digit number
  const random = Math.floor(10000 + Math.random() * 90000);
  return `PRC-${year}-${random}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const profName = formData.get('profName') as string;
    const collegeEmail = formData.get('collegeEmail') as string;
    const department = formData.get('department') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const requiredDate = formData.get('requiredDate') as string;
    const urgency = formData.get('urgency') as string;
    
    // In a real V1 with file upload, we'd handle the files here.
    // We would save them to a secure directory outside 'public'
    // and save the metadata to the Attachment table.
    
    if (!title || !description || !profName || !collegeEmail || !department || !phoneNumber || !requiredDate || !urgency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate a unique reference ID
    let referenceId = generateReferenceId();
    let isUnique = false;
    
    while (!isUnique) {
      const existing = await prisma.requirement.findUnique({
        where: { referenceId }
      });
      
      if (!existing) {
        isUnique = true;
      } else {
        referenceId = generateReferenceId();
      }
    }
    
    // Save to database
    const requirement = await prisma.requirement.create({
      data: {
        referenceId,
        title,
        description,
        profName,
        collegeEmail,
        department,
        phoneNumber,
        requiredDate: new Date(requiredDate),
        urgency,
        status: 'Submitted'
      }
    });
    
    // Attempt to send email but don't fail the request if it fails
    // In a production system we'd use a background worker for this
    sendConfirmationEmail(collegeEmail, profName, referenceId, title).catch(console.error);
    
    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Requirement submitted successfully'
    });
    
  } catch (error) {
    console.error('Error submitting requirement:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
