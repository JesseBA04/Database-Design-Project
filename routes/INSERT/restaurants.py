def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add another restaurant
    restaurant_id = int(input("Please enter your restaurant id: "))
    name = input("Please enter the restaurant name: ")
    food_category = input("Please enter the food category: ")
    price_category = input("Please enter the price category: ")
    you_pass_eligible = input("Please enter if YouPass eligible (true/false): ").strip().lower() == "true"

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Restaurants" ("Restaurant_id", "Name", "Food_Category", "Price_Category", "YouPass_eligible") VALUES (%s, %s, %s, %s, %s)',
        (restaurant_id, name, food_category, price_category, you_pass_eligible)
    )

    # commit the changes
    conn.commit()
