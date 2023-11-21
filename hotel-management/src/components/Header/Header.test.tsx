import renderer from 'react-test-renderer'
import Header from '.'

describe('Header testing snapshot', () => {
  const wrapper = renderer.create(<Header accountName='Nezumi' />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
