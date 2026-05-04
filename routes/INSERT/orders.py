def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add an order
    order_id = int(input("Please enter the order id: "))
    restaurant_id = int(input("Please enter the restaurant id: "))
    user_id = int(input("Please enter the user id: "))
    order_date = input("Please enter the order date: ")
    order_details = input("Please enter the order details: ")
    order_status = input("Please enter the order status: ")
    order_price = float(input("Please enter the order price: "))

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Orders" ("Order_id", "Restaurant_id", "User_id", "Order_date", "Order_details", "Order_status", "Order_price") VALUES (%s, %s, %s, %s, %s, %s, %s)',
        (order_id, restaurant_id, user_id, order_date, order_details, order_status, order_price)
    )

    # commit the changes
    conn.commit()
