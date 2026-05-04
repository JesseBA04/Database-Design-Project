def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add user profile information
    user_id = int(input("Please enter the user id: "))
    profile_picture = input("Please enter the profile picture URL: ")
    name = input("Please enter the name: ")
    age = int(input("Please enter the age: "))
    creation_date = input("Please enter the creation date: ")

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "User_profile_information" ("User_id", "Profile_picture", "Name", "Age", "Creation_date") VALUES (%s, %s, %s, %s, %s)',
        (user_id, profile_picture, name, age, creation_date)
    )

    # commit the changes
    conn.commit()
