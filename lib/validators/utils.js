import { NextResponse } from "next/server";

export function handleZodError(error) {
    // Get the first error message from the array of errors
    // This provides a specific, user-friendly error message (e.g., "Invalid email address")
    // instead of a generic "Validation failed"
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
