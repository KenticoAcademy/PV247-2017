import {
    savingFinished,
    savingStarted
} from './actionCreators';
import { saveItemsFactory } from './saveItems';

test('dispatches actions in the correct order', () => {
    const dispatch = jest.fn();
    const getState = () => ({
        todoApp: {
            items: {
                allIds: {
                    toJS: jest.fn()
                },
                byId: {
                    mapEntries: () => ({
                        toJS: jest.fn()
                    }),
                    toJS: jest.fn()
                }
            }
        }
    });

    const saveItems = saveItemsFactory(jest.fn());
    const dispatchable = saveItems();

    jest.useFakeTimers();

    dispatchable(dispatch, getState);

    jest.runTimersToTime(1000); // Skip 1 second ahead

    expect(dispatch).toHaveBeenCalledWith(savingStarted());
    expect(dispatch).toHaveBeenLastCalledWith(savingFinished());
});