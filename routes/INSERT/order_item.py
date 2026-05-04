def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add an order item
    order_item_id = int(input("Please enter the order item id: "))
    order_id = int(input("Please enter the order id: "))
    food_item_id = int(input("Please enter the food item id: "))
    quantity = int(input("Please enter the quantity: "))
    item_price = float(input("Please enter the item price: "))

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "OrderItem" ("order_item_id", "Order_id", "Food_Item_id", "quantity", "item_price") VALUES (%s, %s, %s, %s, %s)',
        (order_item_id, order_id, food_item_id, quantity, item_price)
    )

    # commit the changes
    conn.commit()
