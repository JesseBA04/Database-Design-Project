def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a location entry
    restaurant_id = int(input("Please enter the restaurant id: "))
    address = input("Please enter the address: ")
    operating_hours = input("Please enter the operating hours: ")

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Locations" ("Restaurant_id", "Address", "Operating_hours") VALUES (%s, %s, %s)',
        (restaurant_id, address, operating_hours)
    )

    # commit the changes
    conn.commit()
