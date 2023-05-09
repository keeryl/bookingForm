import { useState } from 'react';
import 'dayjs/locale/ru';
import type { SelectProps } from 'antd';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import locale from 'antd/es/date-picker/locale/ru_RU';
import './App.css';
import { Form, DatePicker, Select, Input, Button, TimePicker } from 'antd';

const optionsFloors: SelectProps['options'] = [];

for (let i = 3; i <= 27; i++) {
  optionsFloors.push({
    value: i.toString(),
    label: i.toString(),
  });
}

const optionsRooms: SelectProps['options'] = [];

for (let i = 1; i <= 10; i++) {
  optionsRooms.push({
    value: i.toString(),
    label: i.toString(),
  });
}

function App() {

  const [form] = Form.useForm();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSubmit = (fieldsValue: any) => {

    const rangeTimeValue = fieldsValue['booking_time'];
    const values = {
      ...fieldsValue,
      'booking_date': fieldsValue['booking_date'].format('DD.MM.YYYY'),
      'booking_time': [
        rangeTimeValue[0].format('HH:mm'),
        rangeTimeValue[1].format('HH:mm'),
      ],
    };
    console.log('FORM VALUES: ', JSON.stringify(values));

  }

  const onReset = () => {
    form.resetFields();
    setIsSubmitDisabled(true);
  };

  const hadleSubmitDisable = () => {
    const { booking_date, booking_time, floor, meeting_room, tower } = form.getFieldsValue();
    const valuesEntered = !!booking_time && !!floor && !!meeting_room && !!tower && !!booking_date;
    setIsSubmitDisabled(!valuesEntered);
  }

  return (
    <main className="App">
      
      <ConfigProvider locale={ruRU}>
        <Form
          form={form}
          layout='vertical'
          className='form'
          onFinish={handleSubmit}
          onValuesChange={() => {
            hadleSubmitDisable()
          }}
        >
          <h1 className='title'>Бронирование переговорной комнаты</h1>

          <Form.Item
          className='formItem'
           name='tower'
           label='Башня'
           required={true}
          >
            <Select>
              <Select.Option value='А'>Башня А</Select.Option>
              <Select.Option value='Б'>Башня Б</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className='formItem'
            name='floor'
            label='Этаж'
            required={true}
          >
            <Select options={optionsFloors} />
          </Form.Item>

          <Form.Item
            name='meeting_room'
            label='Номер переговорной'
            required={true}
          >
            <Select options={optionsRooms} />
          </Form.Item>

          <Form.Item
            className='formItem'
            name='booking_date'
            label='Дата'
            required={true}
          >
            <DatePicker
              locale={locale}
              format='D MMMM YYYY'
              style={{width: '100%'}}
            />
          </Form.Item>

          <Form.Item
            className='formItem'
            name='booking_time'
            label='Время'
            required={true}
          >
            <TimePicker.RangePicker
              format='HH:mm'
              style={{width: '100%'}}
            />
          </Form.Item>

          <Form.Item
            className='formItem'
            name='comment'
            label='Комментарий'
          >
            <Input.TextArea rows={4} style={{ resize: 'none' }}/>
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
                <Button
                  className='submitBtn'
                  block
                  type='primary'
                  htmlType='submit'
                  disabled={isSubmitDisabled}
                >
                  Забронировать
                </Button>
            )}          
          </Form.Item>
          <Form.Item>
            <Button block htmlType='reset' onClick={onReset}>
              Очистить
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </main>
  );
}

export default App;
