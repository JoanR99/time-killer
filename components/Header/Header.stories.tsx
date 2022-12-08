import { ComponentMeta, ComponentStory } from '@storybook/react';
import AuthDecorator from './authDecorator';
import Header from './Header';

export default {
	title: 'UI/Header',
	component: Header,
	decorators: [AuthDecorator],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const LogInHeader = Template.bind({});

export const LogOutHeader = Template.bind({});
LogOutHeader.parameters = {
	auth: {
		currentUser: 'user-details',
	},
};
