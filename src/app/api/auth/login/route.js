import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../../../../server/db"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // Fetch user from the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    const user = result.rows[0]

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password" }, { status: 400 })
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })

    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}