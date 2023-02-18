const mongoose = require('mongoose');

// This Schema is going to have a relationship with the UserSchema.

const noteSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Ticket',
		},
		text: {
			type: String,
		},
		isStaff: {
			type: Boolean,
			default: false,
		},
		staffResponse: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Note', noteSchema);
