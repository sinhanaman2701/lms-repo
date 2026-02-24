import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Explicit server-side validation (Deterministic Backend Principle)
        const requiredFields = [
            'name',
            'buildingName',
            'flatNumber',
            'towerNo',
            'leaseStartDate',
            'leaseEndDate',
            'monthlyLeaseAmount'
        ];

        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Convert to explicit schema types
        const leaseData = {
            name: String(body.name),
            buildingName: String(body.buildingName),
            flatNumber: String(body.flatNumber),
            towerNo: String(body.towerNo),
            leaseStartDate: new Date(body.leaseStartDate).toISOString(),
            leaseEndDate: new Date(body.leaseEndDate).toISOString(),
            monthlyLeaseAmount: Number(body.monthlyLeaseAmount)
        };

        // Ensure numbers are valid
        if (isNaN(leaseData.monthlyLeaseAmount)) {
            return NextResponse.json(
                { error: 'monthlyLeaseAmount must be a valid number' },
                { status: 400 }
            );
        }

        // Simulate database operation successfully
        // In future versions, this will connect to MongoDB
        console.log('Deterministic execution: Simulated saving lease to database', leaseData);

        return NextResponse.json(
            {
                success: true,
                message: 'Lease created successfully in core-platform',
                data: leaseData
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request format', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 400 }
        );
    }
}
