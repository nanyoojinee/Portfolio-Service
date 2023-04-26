import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    certificateName: {
        type: String,
        required: true,
    },
    certificateDetail: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
})

const CertificateModel = model("Certificate", CertificateSchema)

export {CertificateModel}