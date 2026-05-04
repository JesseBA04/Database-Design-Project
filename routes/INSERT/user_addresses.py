def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a user address
    user_id = int(input("Please enter the user id: "))
    address = input("Please enter the address: ")
    nickname = input("Please enter the nickname: ")
    is_home = input("Is this a home address? (true/false): ").strip().lower() == "true"
    is_work = input("Is this a work address? (true/false): ").strip().lower() == "true"

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "User_Addresses" ("User_id", "Address", "Nickname", "Is_home", "Is_work") VALUES (%s, %s, %s, %s, %s)',
        (user_id, address, nickname, is_home, is_work)
    )

    # commit the changes
    conn.commit()
