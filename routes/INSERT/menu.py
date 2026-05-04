def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a menu entry
    restaurant_id = int(input("Please enter the restaurant id: "))
    food_item_id = int(input("Please enter the food item id: "))

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Menu" ("Restaurant_id", "Food_Item_id") VALUES (%s, %s)',
        (restaurant_id, food_item_id)
    )

    # commit the changes
    conn.commit()
