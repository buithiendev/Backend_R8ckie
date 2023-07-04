import { Router } from "express";
import { authentication } from "../../auth/admin.auth";
const router = Router()

router.use(authentication)

router.post('/create')
router.post('/:id/enable')
router.post('/:id/disable')
router.delete('/:id')


export default router