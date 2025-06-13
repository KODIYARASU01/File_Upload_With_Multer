
export const SingleFileUpload=async(req,res)=>{
 res.json({
    message:'File Uploaded!',
    data:req.file
 })
}
export const MultipleFileUpload=async(req,res)=>{
 res.json({
    message:'Files Uploaded!',
    data:req.files
 })
}