export async function GET(request) {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true, // Ensure this relationship exists in your schema
      },
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Unable to fetch Sales', error: error.message },
      { status: 500 }
    );
  }
}
