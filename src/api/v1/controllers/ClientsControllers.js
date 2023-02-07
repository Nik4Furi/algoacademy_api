const ClientsModal = require("../../modals/ClientsModal");

//------------Start to create a 'client controller' for specially to configur--> contact etc------X
function ClientsConrtollers() {
    return {
        //-------If any query, than contact or concern with us------X
        async Contact(req,res){
            //get the constraints from 'req.body'
            const {fullname,email,phone,profession,concern} = req.body;

            try {
                //Checking the constraits are not blank--X
                if (!fullname || !email || !profession || !concern) {
                    return res.status(404).json({ success: false, msg: "All field are required" });
                }

                //------Checking there the concern is already exist--------X
                let clientConcern = await ClientsModal.findOne({concern});

                if (clientConcern) {
                    return res.status(401).json({success:false,msg:"This similiar concern is already solved!"})

                }

                const clients = await ClientsModal({
                    fullname,email,phone,profession,concern
                })

                await clients.save();

                return res.status(200).json({success:true,msg:"Your query is resloved after the discussion,Have A Good Day"})

            } catch (error) { return res.status(500).json({ success: false, msg: `${error.message}` }); }
        }
    }
} 

module.exports = ClientsConrtollers