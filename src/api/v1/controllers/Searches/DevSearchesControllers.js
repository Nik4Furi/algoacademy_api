const FileModal = require("../../../modals/FileModal")
const UsersModal = require("../../../modals/UsersModal")

//--------Start to creating 'searches' controllers where we are writing controllers to search or find somethin, That's are use by the 'Developers Only' !------X
function DevSearchesControllers() {
    return {
        //------Developers want to search mentors with their ids
        async Mentor(req,res){
            //Get the constraints from 'req.params'
            const {id} = req.params

            //Checking the id is matching or not
            try {
                const mentors = await UsersModal.findOne({_id:id})
                if (!mentors) {
                    return res.status(404).json({success:false, msg:'Given mentor id of the users is not find or exist'})
                }
                return res.status(200).json({success:true,msg:"Successfully finding the given id mentor",mentors})

            } catch (error) { return res.status(500).json({success:false,msg:error}) }
        },

        //------Here we are finding the img of the given id of the 'FileModal;------X
        async Files(req,res){
              //Get the constraints from 'req.params'
              const {id} = req.params

              //Checking the id is matching or not
              try {
                  const files = await FileModal.findOne({_id:id})
                  if (!files) {
                      return res.status(404).json({success:false, msg:'Given files id of the img is not find or exist'})
                  }
                  return res.status(200).json({success:true,msg:"Successfully finding the given id img ",files})
  
              } catch (error) { return res.status(500).json({success:false,msg:error}) }
        }
        }
}

module.exports = DevSearchesControllers;