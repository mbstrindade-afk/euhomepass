import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
	try {
		const { email, currentPassword, newPassword } = await req.json();
		if (!email || !currentPassword || !newPassword) {
			return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
		}
		const user = UserRepository.findByEmail(email);
		if (!user || !user.password) {
			return NextResponse.json({ error: 'User not found.' }, { status: 404 });
		}
		const valid = bcrypt.compareSync(currentPassword, user.password);
		if (!valid) {
			return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
		}
		if (newPassword.length < 8) {
			return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 });
		}
		const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
		const updated = UserRepository.updatePassword(email, hashedNewPassword);
		if (!updated) {
			return NextResponse.json({ error: 'Failed to update password.' }, { status: 500 });
		}
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Password update error:', error);
		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
	}
}
