import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    certificateName: {
        type: String,
        required: true,
    },
    certificateDetail: {
        type: String,
    },
    certificationDate: {
        type: Date,
    },
    certificationGrade: {
        type: String,
    }
},
{
    timestamps: true,
})

const CertificateModel = model("Certificate", CertificateSchema)

export {CertificateModel}