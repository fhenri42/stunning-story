import React, { useState } from 'react';
import Input from '@components/Input';

import Modal from '@components/Modal';
import Button from '@components/Button';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import Divider from '@components/Divider';

export default function PlayerView(props: any) {
  const { t } = useTranslation('common');
  const [buttonLoading, setButtonLoading] = useState(false);

  const {
    openView, setOpenView,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      baseHp: '20',
      baseDmg: '5',
    },
  });

  const editPlayerBaseInfo = async (data: any) => {
    setButtonLoading(data);
  };
  return (
    <Modal
      bodyStyle={{
        padding: 0,
        backgroundColor: '#1B263B',
      }}
      visible={openView}
      onCancel={() => {
        setOpenView(false);
      }}
    >
      <form
        className="flex flex-col items-center justify-center w-full p-5"
        onSubmit={handleSubmit(editPlayerBaseInfo)}
      >
        <div className="flex flex-col w-full my-5">
          <p>{t('builder.player_view.base_hp')}</p>
          <Input
            className="w-full"
            register={register}
            name="baseHp"
            placeholder={t('builder.player_view.base_hp_placeholder')}
            required
            error={
              errors.baseHp ? t('builder.player_view.base_hp_required') : ''
            }
          />
          <p>{t('builder.player_view.base_dmg')}</p>
          <Input
            className="w-full"
            register={register}
            name="baseDmg"
            placeholder={t('builder.player_view.base_dmg_placeholder')}
            required
            error={
              errors.baseDmg ? t('builder.player_view.base_dmg_required') : ''
            }
          />
        </div>

        <Divider />

        <div className="py-2 mt-3 flex flex-row items-center justify-between w-full">
          <Button
            loading={buttonLoading}
            type="primary"
            htmlType="submit"
            label={t('builder.edit_save_node.save')}
            size="medium"
          />
        </div>
      </form>
    </Modal>
  );
}
