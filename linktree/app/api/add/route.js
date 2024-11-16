import clientPromise from "@/lib/mongodb"


export async function POST(request) {

    const body=await request.json()
    const client=await clientPromise 
    const db=client.db("bittree")
    const collection = db.collection("links")


    const doc=await collection.findOne({handle:body.handle})
    if(doc){
    return Response.json({success:false,error:true, message: 'This Bittree already exists!',result:null }) 
    }

    const result = await collection.insertOne(body)

    return Response.json({success:true,error:false, message: 'Your link has been generated.',result:result })
  }