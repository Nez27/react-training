import { RiEditBoxFill, RiDeleteBin2Line } from 'react-icons/ri';
import { RenderResult, fireEvent, render } from '@testing-library/react';

// Components
import Menus from '.';

describe('Menus', () => {
  const id = '123';
  const handleOnClick = jest.fn();

  let wrapper: RenderResult | null = null;

  beforeEach(() => {
    wrapper = render(
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id.toString()}>
            <Menus.Button onClick={handleOnClick} icon={<RiEditBoxFill />}>
              Edit
            </Menus.Button>
            <Menus.Button onClick={handleOnClick} icon={<RiDeleteBin2Line />}>
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>
    );
  });

  test('Should render correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should show context menu', async () => {
    const btn = await wrapper!.findByRole('button');

    fireEvent.click(btn);

    const editBtn = wrapper!.getByText('Edit');

    expect(editBtn).toBeInTheDocument();

    fireEvent.click(btn);

    expect(editBtn).not.toBeInTheDocument();
  });

  test('HandleOnClick should work', async () => {
    const btn = await wrapper!.findByRole('button');

    fireEvent.click(btn);

    const editBtn = wrapper!.getByText('Edit');

    fireEvent.click(editBtn);

    expect(handleOnClick).toHaveBeenCalled();
  });
});
