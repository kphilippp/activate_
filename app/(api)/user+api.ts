import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the environment variables");
  }

  console.log("Preparing request to be sent\n");
  const sql = neon(`${process.env.DATABASE_URL}`);
  const { firstName, lastName, email, clerkID } = await request.json();

  // Checking if all required fields are present
  console.log("Checking if all required fields are present\n");

  if (!firstName || !lastName || !email || !clerkID) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("Trying SQL Query\n");
  try {
    // SQL Query
    const response = await sql`
      INSERT INTO users (
        firstName, lastName, email, clerkid
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${clerkID}
      )
    `;
    console.log("Inserted in Neon\n");
    return new Response(JSON.stringify({ data: response }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
