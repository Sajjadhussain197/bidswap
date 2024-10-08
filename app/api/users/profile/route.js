import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request) {
    try {
        const { userId, dateOfBirth, address, name } = await request.json();
        console.log('Incoming request data:', { userId, dateOfBirth, address, name });

        // Check if userId is provided
        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Check if the user exists
        const userExists = await db.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Prepare the data object for updating the profile
        const updateData = {};
        if (dateOfBirth) {
            const date = new Date(dateOfBirth);
            if (!isNaN(date.getTime())) { // Check if the date is valid
                updateData.dateOfBirth = date.toISOString();
            } else {
                return NextResponse.json({ message: 'Invalid date format' }, { status: 400 });
            }
        }
        if (address) updateData.address = address;

        // Check if the user profile exists
        const profileExists = await db.userProfile.findUnique({ where: { userId } });
        if (!profileExists) {
            return NextResponse.json({ message: 'User profile not found' }, { status: 404 });
        }

        // Update the user profile
        let updatedProfile;
        try {
            updatedProfile = await db.userProfile.update({
                where: { userId },
                data: updateData,
            });
        } catch (updateError) {
            console.error('Database update error:', updateError);
            return NextResponse.json({
                message: 'Error updating user profile in the database',
                error: updateError.message || 'Unknown database error'
            }, { status: 500 });
        }

        // Optionally update the user's name if it was provided
        if (name) {
            await db.user.update({
                where: { id: userId },
                data: { name },
            });
        }

        return NextResponse.json({
            data: updatedProfile,
            message: 'User profile updated successfully',
        }, { status: 200 });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({
            message: 'Error updating user profile',
            error: error.message || 'Unknown error',
            stack: error.stack // Optionally include stack trace
        }, { status: 500 });
    }
}
