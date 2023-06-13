import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-rn';

const ContactCard = ({ contact }) => {
  const { firstName, lastName, jobTitle, company, phoneNumbers, emails } = contact;

  return (
    <View style={tw(`bg-white rounded-lg p-4 shadow-md`)}>
      <View style={tw(`flex-row items-center mb-4`)}>
        <Text style={tw(`text-2xl font-bold mr-2`)}>{firstName}</Text>
        <Text style={tw(`text-2xl font-bold`)}>{lastName}</Text>
      </View>

      <View style={tw(`mb-4`)}>
        <Text style={tw(`text-gray-500`)}>{jobTitle}</Text>
        <Text style={tw(`text-gray-500`)}>{company}</Text>
      </View>

      <View style={tw(`mb-4`)}>
        <Text style={tw(`text-lg font-bold`)}>Phone Numbers:</Text>
        {phoneNumbers.map((phoneNumber) => (
          <Text key={phoneNumber.id} style={tw(`text-gray-500`)}>
            {phoneNumber.label}: {phoneNumber.number}
          </Text>
        ))}
      </View>

      <View style={tw(`mb-4`)}>
        <Text style={tw(`text-lg font-bold`)}>Emails:</Text>
        {emails?.map((email) => (
          <Text key={email.id} style={tw(`text-gray-500`)}>
            {email.label}: {email.email}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ContactCard;