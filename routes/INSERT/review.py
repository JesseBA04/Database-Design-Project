def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a review
    restaurant_id = int(input("Please enter the restaurant id: "))
    food_item_id = int(input("Please enter the food item id: "))
    user_id = int(input("Please enter the user id: "))
    stars = float(input("Please enter the star rating: "))
    review_text = input("Please enter the review text: ")

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Review" ("Restaurant_id", "Food_Item_id", "User_id", "Stars", "Review_text") VALUES (%s, %s, %s, %s, %s)',
        (restaurant_id, food_item_id, user_id, stars, review_text)
    )

    # commit the changes
    conn.commit()
