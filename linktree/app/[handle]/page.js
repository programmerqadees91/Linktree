import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    const handle = (await params).handle
    const client=await clientPromise 
    const db=client.db("bittree")
    const collection = db.collection("links")


    const item=await collection.findOne({handle:handle})
    if(!item){
      return notFound()
    }

    const item2={
    //    {
  "_id": {
    "$oid": "673887bc72983a2adec57f10"
  },
  "links": [
    {
      "link": "https://www.instagram.com/codewithharry/?hl=en",
      "linktext": "Instagram"
    },
    {
      "link": "https://www.codewithharry.com",
      "linktext": "Website"
    },
    {
      "link": "https://www.YouTube.com/codewithharry/?hl=en",
      "linktext": "Youtube"
    }
  ],
  "handle": "Harry",
  "pic": "https://avatars.githubusercontent.com/u/48705673?v=4",
  "desc": ""
}
    

    return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
      {item && <div className="photo flex justify-center flex-col items-center gap-4">
            <img src={item.pic} />
            <span className="font-bold text-xl ">@{item.handle}</span>
            <span className="desc w-80 text-center">{item.desc}</span>
            <div className="links">
              {item.links.map((item,index)=>{
                return <Link key={index} href={item.link}><div className="bg-purple-100 py-4 shadow-lg px-2 rounded-md my-3 min-w-96 flex justify-center">
                {item.linktext}
                  
                </div></Link>
              })}
            </div>
            </div>}
    </div>
  }