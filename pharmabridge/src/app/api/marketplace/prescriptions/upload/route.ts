import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('prescription')

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  return NextResponse.json(
    {
      id: String(Date.now()),
      filename: typeof file === 'string' ? file : file.name,
      url: `/api/uploads/prescriptions/${Date.now()}.jpg`,
      uploadedAt: new Date().toISOString(),
      status: 'processed',
    },
    { status: 201 },
  )
}
