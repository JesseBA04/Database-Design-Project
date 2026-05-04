def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add payment info
    user_id = int(input("Please enter the user id: "))
    issuer = input("Please enter the card issuer: ")
    card_number = input("Please enter the card number: ")
    card_expiration = input("Please enter the card expiration: ")
    card_name = input("Please enter the name on the card: ")
    card_cvv = input("Please enter the card CVV: ")

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Payment Info" ("User_id", "Issuer", "Card_number", "Card_expiration", "Card_name", "Card_cvv") VALUES (%s, %s, %s, %s, %s, %s)',
        (user_id, issuer, card_number, card_expiration, card_name, card_cvv)
    )

    # commit the changes
    conn.commit()
