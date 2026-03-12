import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

const AnyListLib = require('anylist');

export class AnyList implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AnyList',
		name: 'anyList',
		icon: 'file:anylist.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with AnyList API',
		defaults: {
			name: 'AnyList',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'anyListApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'List',
						value: 'list',
					},
					{
						name: 'Item',
						value: 'item',
					},
					{
						name: 'Recipe',
						value: 'recipe',
					},
					{
						name: 'Meal Plan',
						value: 'mealPlan',
					},
				],
				default: 'list',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'list',
						],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all lists',
						action: 'Get all lists',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'item',
						],
					},
				},
				options: [
					{
						name: 'Add',
						value: 'add',
						description: 'Add an item to a list',
						action: 'Add an item to a list',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all items in a list',
						action: 'Get all items in a list',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an item (e.g., check/uncheck)',
						action: 'Update an item',
					},
					{
						name: 'Remove',
						value: 'remove',
						description: 'Remove an item from a list',
						action: 'Remove an item',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'recipe',
						],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all recipes',
						action: 'Get all recipes',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'mealPlan',
						],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all meal plan events',
						action: 'Get all meal plan events',
					},
					{
						name: 'Add',
						value: 'add',
						description: 'Add a meal plan event',
						action: 'Add a meal plan event',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'List Name or ID',
				name: 'listId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'item',
						],
					},
				},
				description: 'The name or ID of the list',
			},
			{
				displayName: 'Item Name',
				name: 'itemName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'item',
						],
						operation: [
							'add',
						],
					},
				},
				description: 'The name of the item to add',
			},
			{
				displayName: 'Item ID',
				name: 'itemId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: [
							'item',
						],
						operation: [
							'update',
							'remove',
						],
					},
				},
				description: 'The ID of the item to update or remove',
			},
			{
				displayName: 'Checked',
				name: 'checked',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: [
							'item',
						],
						operation: [
							'update',
						],
					},
				},
				description: 'Whether the item is checked',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'mealPlan',
						],
						operation: [
							'add',
						],
					},
				},
				description: 'The title of the meal plan event (used for notes)',
			},
			{
				displayName: 'Recipe Name or ID',
				name: 'recipeId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'mealPlan',
						],
						operation: [
							'add',
						],
					},
				},
				description: 'The name or ID of the recipe to add to the meal plan',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'mealPlan',
						],
						operation: [
							'add',
						],
					},
				},
				description: 'The date for the meal plan event',
			},
			{
				displayName: 'Meal Name',
				name: 'mealName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'mealPlan',
						],
						operation: [
							'add',
						],
					},
				},
				placeholder: 'Dinner',
				description: 'The name of the meal (e.g., Breakfast, Lunch, Dinner)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('anyListApi') as IDataObject;
		const any = new AnyListLib({
			email: credentials.email as string,
			password: credentials.password as string,
		});

		await any.login();
		await any.getLists();

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'list') {
					if (operation === 'getAll') {
						const lists = any.lists.map((list: any) => ({
							name: list.name,
							identifier: list.identifier,
						}));
						returnData.push(...this.helpers.returnJsonArray(lists));
					}
				} else if (resource === 'item') {
					const listId = this.getNodeParameter('listId', i) as string;
					const list = any.getListById(listId) || any.getListByName(listId);

					if (!list) {
						throw new Error(`List with ID or name "${listId}" not found`);
					}

					if (operation === 'add') {
						const itemName = this.getNodeParameter('itemName', i) as string;
						const item = any.createItem({ name: itemName });
						await list.addItem(item);
						returnData.push({ json: item });
					} else if (operation === 'getAll') {
						returnData.push(...this.helpers.returnJsonArray(list.items));
					} else if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const checked = this.getNodeParameter('checked', i) as boolean;
						const item = list.items.find((it: any) => it.identifier === itemId || it.name === itemId);
						if (!item) {
							throw new Error(`Item with ID or name "${itemId}" not found in list "${listId}"`);
						}
						item.checked = checked;
						await item.save();
						returnData.push({ json: item });
					} else if (operation === 'remove') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const item = list.items.find((it: any) => it.identifier === itemId || it.name === itemId);
						if (!item) {
							throw new Error(`Item with ID or name "${itemId}" not found in list "${listId}"`);
						}
						await list.removeItem(item);
						returnData.push({ json: { success: true } });
					}
				} else if (resource === 'recipe') {
					if (operation === 'getAll') {
						const recipes = await any.getRecipes();
						returnData.push(...this.helpers.returnJsonArray(recipes));
					}
				} else if (resource === 'mealPlan') {
					if (operation === 'getAll') {
						const events = await any.getMealPlanEvents();
						returnData.push(...this.helpers.returnJsonArray(events));
					} else if (operation === 'add') {
						const title = this.getNodeParameter('title', i) as string;
						const recipeIdOrName = this.getNodeParameter('recipeId', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const mealName = this.getNodeParameter('mealName', i) as string;

						const options: any = {
							date: date ? new Date(date) : new Date(),
						};

						if (title) {
							options.title = title;
						}

						if (mealName) {
							options.mealName = mealName;
						}

						if (recipeIdOrName) {
							const recipes = await any.getRecipes();
							const recipe = recipes.find((r: any) => r.identifier === recipeIdOrName || r.name === recipeIdOrName);
							if (recipe) {
								options.recipeId = recipe.identifier;
							} else {
								throw new Error(`Recipe with ID or name "${recipeIdOrName}" not found`);
							}
						}

						const event = any.createEvent(options);
						await event.save();
						returnData.push({ json: event });
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
