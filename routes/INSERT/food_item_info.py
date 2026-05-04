def run(conn):
    # make a "cursor" which is an object to
    # help us run SQL and fetch data
    cur = conn.cursor()

    # add a food item
    food_item_id = int(input("Please enter the food item id: "))
    item_name = input("Please enter the item name: ")
    item_picture = input("Please enter the item picture URL: ")
    item_description = input("Please enter the item description: ")
    allergy_information = input("Please enter the allergy information: ")
    preparation_edits = input("Please enter the preparation edits: ")

    # this time we'll use parameter binding
    cur.execute(
        'INSERT INTO "Food_Item_Info" ("Food_Item_id", "Item Name", "Item Picture", "Item Description", "Allergy Information", "Preparation Edits") VALUES (%s, %s, %s, %s, %s, %s)',
        (food_item_id, item_name, item_picture, item_description, allergy_information, preparation_edits)
    )

    # commit the changes
    conn.commit()
