import { StaticImageData } from 'next/image'
import chillingPool from '@/asset/picture/Rectangle 20.png'
import airplaneFly from '@/asset/picture/Group 5.png'
import boatAndSee from '@/asset/picture/boatAndSee.png'
import avatar from '@/asset/picture/amime.png'

const image : {
    chillingPool : StaticImageData | string, 
    airplaneFly : StaticImageData | string, 
    boatAndSee : StaticImageData | string,
    avatar : StaticImageData | string,
} ={
        chillingPool,
        airplaneFly,
        boatAndSee,
        avatar
    }


export default image