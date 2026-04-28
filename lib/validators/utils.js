import { NextResponse } from "next/server";

export function handleZodError(error) {
    const firstIssue = error.errors[0];
    const errorMessage = firstIssue ? firstIssue.message : "Validation failed";

    return NextResponse.json(
        {
            error: errorMessage,
            issues: error.flatten().fieldErrors,
        },
        { status: 400 }
    );
}
