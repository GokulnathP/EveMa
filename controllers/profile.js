// Importing models
const User = require('../models/user');
const Profile = require('../models/profile');

// Importing throw error utility function
const throwError = require('../utility/throwError');
const deleteFile = require('../utility/deleteFile');

// It will return profile of user
exports.getProfile = (req, res) => {
    let loadedUser;

    // Find the user by userId from token
    User.findById(req.userId)
        .then(user => {

            loadedUser = user;

            // Return empty profile for organizer
            if (user.role.includes('Organizer')) {
                let profile = {};
                return profile;
            } else {
                // Find profile for exhibitor and visitor
                return Profile.findOne({ userId: req.userId });
            }

        })
        .then(profile => {
            // Return profile for exhibitor and visitor
            return res.status(200).json({ message: 'Success', user: loadedUser, profile: profile });
        })
        .catch(err => {
            return throwError(err, res);
        })
}

//Updating profiles of visitor and exhibitor
exports.updateProfile = (req, res) => {
    let loadedUser;

    User.findById(req.userId)
        .then((user) => {
            if (user.role.includes('Organizer')) {
                const error = new Error("Organizer cannot update profile")
                error.statusCode = 401
                throw error
            }
            loadedUser = user;
            return Profile.findOne({ userId: req.userId })
        })
        .then((profile) => {
            profile.firstName = req.body.firstName
            profile.lastName = req.body.lastName
            profile.gender = req.body.gender
            profile.dateOfBirth = req.body.dateOfBirth
            profile.country = req.body.country
            profile.state = req.body.state
            profile.cityName = req.body.cityName
            profile.zipCode = req.body.zipCode
            profile.areaOfInterest = req.body.areaOfInterest
            profile.designation = req.body.designation
            profile.companyName = req.body.companyName
            profile.companyAddress = req.body.companyAddress
            profile.contactNumber = req.body.contactNumber

            return profile.save()
        })
        .then((profile) => {
            res.status(200).json({ message: 'Success', user: loadedUser, profile: profile })
        })
        .catch((err) => {
            throwError(err, res)
        })
}

// Updating profile image
exports.updateProfileImage = (req, res) => {
    if (req.error) {
        return res.status(422).json({ message: "Failed", error: req.error });
    };

    Profile.findOne({ userId: req.userId })
        .then(profile => {
            if (!profile) {
                const error = new Error("Profile not found");
                error.statusCode = 404;
                throw error;
            }
            if (req.file) {
                if (profile.image !== 'public/profileImages/default.png') {
                    deleteFile(profile.image);
                }
                profile.image = req.file.path;
            }
            return profile.save()
        })
        .then(profile => {
            res.status(200).json({ message: "Success", profile: profile });
        })
        .catch(err => {
            throwError(err, res);
        });
}