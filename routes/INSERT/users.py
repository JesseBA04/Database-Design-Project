def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a user
    user_id = int(input("Please enter the user id: "))
    you_pass_status = input("Please enter YouPass status (true/false): ").strip().lower() == "true"

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Users" ("User_id", "YouPass_status") VALUES (%s, %s)',
        (user_id, you_pass_status)
    )

    # commit the changes
    conn.commit()
