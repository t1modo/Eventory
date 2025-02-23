import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import pool from "../../../../server/db"

export async function POST(req) {
  try {
    const { username, email, password } = await req.json()

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Insert the user into the database
    const result = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id", [
      username,
      email,
      hashedPassword,
    ])

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Registration failed" }, { status: 500 })
  }
}

