// UI/UI/Components/Admin/Home/index.tsx
import SaveIcon from '@material-ui/icons/Save';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { SettingsLayout } from 'UI/Components/Settings/Layout';
import { PaperSection } from 'UI/Components/Settings/PaperSection';
import { FABButton } from 'UI/Components/Style/Buttons/FABButton';
import { BaseTextField } from 'UI/Components/Style/TextField/BaseTextField';
import { Configuration } from 'UI/GraphQL/graphqlTypes.gen';
import { useConfigurationQuery } from './Configuration.gen';
import { useSaveConfigurationMutation } from './SaveConfiguration.gen';
import { useStyles } from './styles';

type HandleChange = <T extends keyof Configuration>(
  key: T,
) => (evt: ChangeEvent<{ value: Configuration[T] }>) => void;

type GetValue = <T extends keyof Configuration>(key: T) => Configuration[T];

export const removeTypename = <T extends any>(Query: T): T =>
  Object.fromEntries(
    Object.entries(Query).filter(([a]) => a !== '__typename' && a !== 'id'),
  );

export function AdminHome(): React.ReactElement {
  const classes = useStyles({});

  const [settings, setSettings] = useState<Configuration>();
  const [saveSettingsFN] = useSaveConfigurationMutation({
    variables: { input: settings! },
  });

  const { data } = useConfigurationQuery({
    onCompleted: (data) => setSettings(removeTypename(data.configuration)),
  });
  const getValue: GetValue = useCallback(
    (key) => (settings ? settings[key] : ''),
    [settings],
  );

  const handleChange: HandleChange = useCallback(
    (key) => ({ target }) =>
      settings
        ? setSettings({ ...settings, [key]: target.value })
        : setSettings({
            [key]: target.value,
          }),
    [settings, data],
  );

  const saveSettings = useCallback(async () => {
    const response = await saveSettingsFN();
  }, [settings]);

  return (
    <>
      <SettingsLayout
        section={{
          background: 'secondary',
          title: {
            title: 'Administration',
            message: 'This is the administration portal',
          },
          className: classes.topSection,
        }}
      >
        <PaperSection
          title='Controller Settings'
          description='Settings for the active controller module'
        >
          <BaseTextField
            label='Controller Host'
            variant='outlined'
            value={getValue('controllerHost')}
            onChange={handleChange('controllerHost')}
          />
          <BaseTextField
            label='Controller Git'
            variant='outlined'
            value={getValue('controllerGit')}
            onChange={handleChange('controllerGit')}
          />
        </PaperSection>
      </SettingsLayout>
      <FABButton
        color='primary'
        location='bottom-right'
        position='fixed'
        icon={<SaveIcon />}
        onClick={saveSettings}
      />
    </>
  );
}
