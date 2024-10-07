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

router.get('/lockers', async ({ view }) => {
    const lockers = await db.query().from("lockers").select("*")
    return view.render('pages/index.edge', { lockers: lockers })
    // return response.status(200).json(lockers)
});

router.post('/lockers', async ({ request, response }) => {
    const { locker_name, site, floor, fk_user } = request.all()

    await db.table("lockers").insert(
        { 
            locker_name: locker_name,
            site: site,
            floor: floor,
            fk_user: fk_user,
            created_at: Date.now(),
            updated_at: Date.now()
        }
    )

    return response.status(200).json("Student/Teacher add to a locker sucessfully")
});

router.put('/lockers/:id', async ({ request, response, params }) => {
    const id = params.id;
    const { locker_name, site, floor, fk_user } = request.all()

    const created_at = await db.from("lockers").select("created_at").where("id", id)

    await db.from("lockers").where("id", id).update(
        {
            locker_name: locker_name,
            site: site,
            floor: floor,
            fk_user: fk_user,
            created_at: created_at,
            updated_at: Date.now()
        }
    );

    return response.status(200).json("Lockers modified has been sucessfully")
});

router.delete('/lockers/:id', async ({ response, params }) => {
    const id = params.id;

    await db.from("lockers").where("id", id).del()

    return response.status(200).json("Lockers has been deleted sucessfully")
});

router.post("/lockers/students", async ({ request, response, params, view }) => {
    const { student_name } = request.all()

    const user_id = await db.from("users").where("username", student_name).select("id")

    await db.from("lockers").update("fk_user", user_id)

    return response.status(200).json("Lockers attributed to a student/teacher")
})