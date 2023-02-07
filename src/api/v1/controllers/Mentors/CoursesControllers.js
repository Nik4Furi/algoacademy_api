//------Imports or required the 'packages', 'middlwares', or config and modals------X
const FileModal = require('../../../modals/FileModal'); //For saving the images of course related

const CoursesModal = require('../../../modals/CoursesModal'); //For saving the images of course related

const { v4: uuid4 } = require('uuid')

//---------Start to create the 'course' controller for perform CRUD operation perform by the 'Mentors or 'Admin'------X
function CoursesControllers() {
    return {
        //---------Adding a new course, using POST '/api/courses/add'
        async Add(req, res) {
            //----Get the constraints from the 'req.body'--
            let { title, description, launchDate, expDate, img, developers } = req.body;

            try {
                // if (!title || !description || !launchDate || !expDate || !img) {
                //     // if (!title || !description ||  !img) {
                //     return res.status(401).json({ success: false, msg: 'All fields are required' });
                // }
                // console.log(req.file);

                //------Here we saving the img first of all-------X
                try {
                    const files = await FileModal({
                        filename: req.file.filename,
                        path: req.file.path,
                        size: req.file.size,
                        uuid: uuid4()
                    })
                    await files.save();
                    img = await files._id.toString();
                    // console.log('new img id is ',img)

                } catch (error) { return res.status(500).json({ success: false, msg: `'${error}' in img processing` }) }

                //--------After saving the img, we are now saving the other courses schemas----X
                const courses = await CoursesModal({
                    mentorID: req.user.id,
                    title,
                    description,
                    img,
                    launchDate,
                    expDate,
                    developers
                })
                await courses.save();

                return res.status(200).json({ success: true, msg: 'Successfully adding a new course', courses })

            } catch (error) { return res.status(500).json({ success: false, msg: `${error}` }) }
        },

        //-----------Start to fetch all the course, without choosing any specific or particular-----X
        async Fetch(req, res) {
            try {
                const courses = await CoursesModal.find();

                if (courses.length == 0) {
                    return res.status(200).json({ success: true, msg: 'No courses are exist yet, Become a person who add new course' })
                }

                return res.status(200).json({ success: true, msg: 'Fetching all the courses...', courses })

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },

        //-------Start to delete a course, using '/api/courses/delete'
        async Delete(req, res) {
            const { _id } = req.params;
            try {
                //----Checking the given id course is exist---X
                let courses = await CoursesModal.findOne({ _id })

                if (!courses) {
                    return res.status(500).json({ success: false, msg: 'Given id of the course not found or exist' })
                }

                courses = await CoursesModal.findByIdAndDelete({ _id })

                return res.status(200).json({ success: true, msg: 'Course is delete successfully' , courses})

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }

        },

        //-----Update the course,of the given id , using '/api/courses/update'
        async Update(req, res) {
            const { _id } = req.params;
            const{title,description,launchDate,expDate,developers,img} = req.body;
            try {
                //----Checking the given id course is exist---X
                let courses = await CoursesModal.findOne({ _id })

                if (!courses) {
                    return res.status(500).json({ success: false, msg: 'Given id of the course not found or exist' })
                }

                //-------Checking the users  are authenticating-------X
                // if(courses.mentorID !== req.user.id){
                //     return res.status(401).json({success:false,msg:'You are not valid mentor , please re-login'})
                // }

                let newCourse = {};

                if(title){newCourse.title = title}
                if(description){newCourse.description = description}
                if(launchDate){newCourse.launchDate = launchDate}
                if(expDate){newCourse.expDate = expDate}
                if(developers){newCourse.developers = developers}
                if(img){newCourse.img = img}

                courses = await CoursesModal.findByIdAndUpdate({ _id },{$set:newCourse},{new:true});

                return res.status(200).json({ success: true, msg: 'Course is update successfully' , courses})

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }

        }
    }
}

module.exports = CoursesControllers;