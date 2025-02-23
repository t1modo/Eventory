import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import pool from "../../../../server/db"

export async function GET(req) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const result = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [decoded.id])

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const user = result.rows[0]
    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}