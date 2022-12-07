import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '../components/Button';

export default {
	title: 'UI/Button',
	component: Button,
	argTypes: {
		fullWidth: {
			type: 'boolean',
		},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {
	intent: 'primary',
};

export const Google = Template.bind({});
Primary.args = {
	intent: 'google',
};
