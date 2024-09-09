/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

router.get('/lockers', async ({ response }) => {
    const lockers = await db.query().from("lockers").select("*")
    return response.status(200).json(lockers)
})

router.post('/lockers/add', async ({ request, response }) => {
    const { locker_name, site, floor, fk_user } = request.all()
    await db.table("lockers").insert(
        { 
            locker_name: locker_name,
            site: site,
            floor: floor,
            fk_user: fk_user,
            created_at: new Date(),
            updated_at: new Date()
        }
    )

    return response.status(200).json("Student/Teacher add to a locker sucessfully")
})