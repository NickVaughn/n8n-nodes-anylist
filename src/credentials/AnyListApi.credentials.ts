import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AnyListApi implements ICredentialType {
	name = 'anyListApi';
	displayName = 'AnyList API';
	properties: INodeProperties[] = [
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
