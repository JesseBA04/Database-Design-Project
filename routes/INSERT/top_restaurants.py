def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a top restaurant entry
    user_id = int(input("Please enter the user id: "))
    restaurant_id = int(input("Please enter the restaurant id: "))
    rating = int(input("Please enter the rating: "))

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Top_Restaurants" ("User_id", "Restaurant_id", "Rating") VALUES (%s, %s, %s)',
        (user_id, restaurant_id, rating)
    )

    # commit the changes
    conn.commit()
