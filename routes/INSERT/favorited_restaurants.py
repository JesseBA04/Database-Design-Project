def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a favorited restaurant entry
    user_id = int(input("Please enter the user id: "))
    restaurant_id = int(input("Please enter the restaurant id: "))

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Favorited_Restaurants" ("User_id", "Restaurant_id") VALUES (%s, %s)',
        (user_id, restaurant_id)
    )

    # commit the changes
    conn.commit()
