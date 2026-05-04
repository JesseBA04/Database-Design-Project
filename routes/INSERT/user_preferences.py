def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add user preferences
    user_id = int(input("Please enter the user id: "))
    notification_preferences = input("Please enter the notification preferences: ")

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "User_preferences" ("User_id", "Notification_preferences") VALUES (%s, %s)',
        (user_id, notification_preferences)
    )

    # commit the changes
    conn.commit()
