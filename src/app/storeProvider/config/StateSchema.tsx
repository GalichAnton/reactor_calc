import type { EOPSchema } from '@entities/EOP';
import type { UserSchema } from '@entities/user';
import type { EnrichmentOperatorSaveSchema } from '@features/enrichment/operator/save';
import type { EnrichmentRuleSaveSchema } from '@features/enrichment/rule/save';
import type { EnvironmentSaveSchema } from '@features/environment/save';
import type { NewEventVersionSchema } from '@features/event/addVersion';
import type { EventSaveSchema } from '@features/event/save';
import type { FieldSaveSchema } from '@features/field/save';
import type { GraphiteRuleSaveSchema } from '@features/graphiteRule/save';
import type { DictionarySaveSchema } from '@features/mmExporter/dictionary/save';
import type { MessageSaveSchema } from '@features/mmExporter/message/save';
import type { MoiraTriggerSaveSchema } from '@features/routerRule/moiraTrigger';
import type { RouterRuleSaveSchema } from '@features/routerRule/save';
import type { rtkApi } from '@shared/api';
import type { ApiType } from '@shared/api/clients';
import type { PersistPartial } from 'redux-persist/es/persistReducer';

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    EOP: EOPSchema & PersistPartial;
    user: UserSchema;
    environmentSave: EnvironmentSaveSchema;
    fieldSave: FieldSaveSchema;
    eventSave: EventSaveSchema & PersistPartial;
    eventNewVersion: NewEventVersionSchema & PersistPartial;
    routerRuleSave: RouterRuleSaveSchema & PersistPartial;
    moiraTrigger: MoiraTriggerSaveSchema & PersistPartial;
    graphiteRule: GraphiteRuleSaveSchema & PersistPartial;
    enrichmentOperator: EnrichmentOperatorSaveSchema & PersistPartial;
    enrichmentRule: EnrichmentRuleSaveSchema & PersistPartial;
    dictionary: DictionarySaveSchema & PersistPartial;
    message: MessageSaveSchema & PersistPartial;
}

export interface ThunkExtraArg {
    api: ApiType;
}
